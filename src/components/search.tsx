import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SearchInput = () => {
  return (
    <div className="flex items-center bg-purple-100 rounded-xl border-primary-300 border px-4 py-2 w-6/12">
      <input
        type="text"
        placeholder="Search for an episode..."
        className="bg-purple-100 outline-none text-gray-600 placeholder-gray-400 w-full"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  )
}

export default SearchInput