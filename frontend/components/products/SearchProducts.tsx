import { resetIdCounter, useCombobox } from 'downshift'
import { useProductsSearch } from '../../lib/graphql'
import { DropDown, DropDownItem, SearchStyles } from '../styles'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SearchProducts() {
  resetIdCounter()
  const router = useRouter()
  const { searchProducts, searchResults, error, loading } = useProductsSearch()

  const searchProductsButDebounce = debounce(searchProducts, 500)

  const {
    getMenuProps,
    getInputProps,
    getItemProps,
    inputValue,
    highlightedIndex,
    selectedItem,
    isOpen,
  } = useCombobox({
    items: searchResults,
    onInputValueChange() {
      searchProductsButDebounce({
        variables: {
          searchTerm: inputValue,
        },
      })
    },
    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) router.push(`/products/${selectedItem.id}`)

      console.log('Selected Item change!')
    },
    itemToString: () => '',
  })

  return (
    <SearchStyles>
      <div>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for a product in out collection',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>

      <DropDown {...getMenuProps()}>
        {isOpen &&
          searchResults.map((product, index) => (
            <DropDownItem
              key={product.id}
              {...getItemProps({ item: product })}
              highlighted={
                highlightedIndex === index || selectedItem === product
              }
            >
              <Link href={`/products/${product.id}`}>
                <div>
                  <Image
                    src={product.photo.image.url}
                    height='36'
                    width='50'
                    alt={product.name}
                  />
                </div>
                {product.name}
              </Link>
            </DropDownItem>
          ))}

        {/* When there is no search results show a friendly message */}
        {isOpen && !searchResults.length && !loading && (
          <DropDownItem>
            Sorry, No Product(s) found for {inputValue}
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  )
}
