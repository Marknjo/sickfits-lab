import { FieldFunctionOptions, FieldPolicy } from '@apollo/client'

interface PaginationArgs {
  skip?: number
  take?: number
}

// FieldPolicy<any, any, any,
// FieldFunctionOptions<Record<string, any>,
// Record<string, any>>> |
// FieldReadFunction<any, any, FieldFunctionOptions<...>>
export function paginationField(): FieldPolicy {
  return {
    keyArgs: false,

    /// @ts-ignore
    read(
      existing: [{ _ref: string }] | [],
      {
        args: { skip = 0, take = existing?.length } = {},
      }: { args: PaginationArgs }
    ) {
      return existing && existing.slice(skip, skip + take)
    },

    /// @ts-ignore
    merge(
      existing: [{ _ref: string }] | [] = [],
      incoming: [{ _ref: string }],
      { args }: { args: PaginationArgs }
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
