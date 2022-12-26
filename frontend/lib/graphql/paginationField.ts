import { InMemoryCache } from '@apollo/client'
import { ProductInterface } from '../../types'

interface Args {
  skip?: number
  take?: number
}

interface Arguments {
  args: Args
  cache: InMemoryCache
}

// FieldPolicy<any, any, any,
// FieldFunctionOptions<Record<string, any>,
// Record<string, any>>> |
// FieldReadFunction<any, any, FieldFunctionOptions<...>>

export function paginationField() {
  return {
    keyArgs: false,

    read(
      existing: [{ _ref: string }],
      {
        args: { skip = 0, take = existing?.length } = {},
      }: { cache: InMemoryCache; args: Args }
    ) {
      return existing && existing.slice(skip, skip + take)
    },

    merge(
      existing: ProductInterface[] = [],
      incoming: ProductInterface[],
      { args }: { args: Args }
    ) {
      const { skip } = args

      const skipWithDefault = skip || 0

      const merged = existing ? existing.slice(0) : []

      for (let i = 0; i < skipWithDefault + incoming.length; ++i) {
        merged[i] = incoming[i - skipWithDefault]
      }

      return merged
    },
  }
}
