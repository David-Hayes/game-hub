import Image from 'next/image'

const Loading = () => {
  return (
    <div className="text-center">
      <Image src="/img/loader.gif" width="64" height="64" />
    </div>
  )
}

export default Loading
