import IconWhite from '../assets/loader-white.gif'
import IconGrey from '../assets/loader-grey.gif'

export const Loader = ({ dark }) => {
  return (
    <div className="my-5">
      <img
        src={dark ? IconGrey : IconWhite}
        alt="Loading..."
        className="mx-auto"
      />
    </div>
  )
}
