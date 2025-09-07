import Carousel from "./components/Carousel";


function App() {
  return (
    <>
      <Carousel />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">
          Hello, Tailwind CSS in React!
        </h1>
      </div>
    </>
  )
}

export default App;