const Fetcher = (...args) => fetch(...args).then((res) => res.json())

export default Fetcher
