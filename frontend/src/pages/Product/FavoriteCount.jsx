import { useSelector } from "react-redux"
import { selectFavoriteProducts } from "../../redux/features/favorites/favoriteSlice"

const FavoriteCount = () => {
    const favorites = useSelector(selectFavoriteProducts)
    const favoritesCount = favorites.length

  return (
    <div className="absolute left-[20px] top-[35px]">
        {favoritesCount > 0 && (
            <span className="px-1.5 py-0 font-semibold text-sm bg-indigo-600 text-white rounded-full
            dark:text-indigo-500 dark:bg-slate-800">
                {favoritesCount}
            </span>
        )}
    </div>
  )
}

export default FavoriteCount