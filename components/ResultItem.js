import Link from 'next/link'

const ResultItem = ({ game }) => {
  return (
    <div className="bg-gray-900 text-white hover:opacity-80 relative">
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
          game.cover ? game.cover.image_id : `nocover_qhhlj6`
        }.jpg`}
        alt={game.name}
      />
      <div className="pt-2 px-3 pb-4">
        <p className="text-sm mb-2 leading-tight">{game.name}</p>
        {game.first_release_date ? (
          <p className="text-xs">
            ({new Date(game.first_release_date * 1000).getFullYear()})
          </p>
        ) : null}
      </div>
      <Link href={`/game/${game.slug}`}>
        <a
          className="absolute top-0 left-0 w-full h-full"
          title={game.name}
        ></a>
      </Link>
    </div>
  )
}

export default ResultItem
