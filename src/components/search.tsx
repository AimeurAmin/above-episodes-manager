import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"

const SearchInput: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
  return (
    <div className="flex items-center rounded-xl border-primary-300 border px-4 py-2 w-full">
      <input
        type="text"
        placeholder="Search by episode title..."
        className="bg-purple-100 outline-none text-gray-600 placeholder-gray-400 w-full"
        {...props}
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  )
}

export default SearchInput