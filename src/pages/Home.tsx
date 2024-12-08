import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="h-screen bg-lamaPurple flex justify-center items-center">
      <div className="leading-5 text-center">
        <p className="text-2xl font-bold">Page is Under Construction....</p><br />
        <p className="text-xl font-semibold">Will be ready soon...</p><br />
        <Link to={'/relations'}><button className="p-4 bg-lamaYellowLight rounded-full">Relation</button></Link>
      </div>
    </div>
  )
}

export default Home