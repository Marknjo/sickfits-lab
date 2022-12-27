import { FieldPolicy, Reference } from '@apollo/client'
import { perPage } from '../../config'

interface PaginationArgs {
  skip?: number
  take?: number
}

/// This is a custom implementation of the pagination - offset based pagination
/// Scored most of the code from internet - a good bunch from Apollo on offset based pagination
/// The - The merged portion is from the implementation of the offsetLimitPagination helper
/// Unfortunately the helper uses behind the scenes offset and limit
/// -> Keystone unfortunately behind the scenes uses skip - for offset and limit for take
/// -> Because of this, the useQuery expects (offset and limit) variables instead of skip and take
/// -> Guessing it is because of Prisma adoption.
/// -> to fix it, I pass the offset and limit to the useQuery, refetch page counts and products
/// -> The rest as in this implementation is all the code borrowed from the main site
/// -> The idea is to have one big chunk of array in cache, so as to loop through and slide
///    previous value in the deleted object position
/// -> Having noted this, offsetLimitPagination helper, fetchMore and concatenation
///    helper are useless her

export function paginationField<T = Reference>(): FieldPolicy<T[]> {
  return {
    keyArgs: false,

    read(existing, { args }) {
      const { skip = 0, take = perPage } = args as PaginationArgs

      return existing && existing.slice(skip, skip + take)
    },

    merge(existing, incoming, { args }) {
      /// Apollo Expects offset
      const { skip = 0 } = args as PaginationArgs

      const merged = existing ? existing.slice(0) : []

      if (!args) {
        // It's unusual (probably a mistake) for a paginated field not
        // to receive any arguments, so you might prefer to throw an
        // exception here, instead of recovering by appending incoming
        // onto the existing array.
        // @ts-ignore
        merged.push.apply(merged, incoming)
      }

      // Assume an offset of 0 if args.offset/skip omitted.
      for (let i = 0; i < incoming.length; ++i) {
        merged[skip + i] = incoming[i]
      }
      return merged
    },
  }
}
