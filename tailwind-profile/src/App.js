import './App.css';

export default function App() {
  return (
    <section className="xl:mx-auto max-w-6xl flex flex-wrap items-center my-16 mx-8 rounded-lg border-solid border-black border-2">
        <img
          src="https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg?w=826"
          alt="User's profile"
          className="w-1/2 lg:w-1/3 xl:w-1/2 mx-auto boder-l rounded-lg border-solid border-black lg:border-r-2"
        />
        <div className="lg:w-2/3 xl:w-1/2">
          <div className="lg:pt-12 pb-12 md:px-12">
            <h2 className="text-blue-500 text-3xl font-bold mb-4 text-center lg:text-left">John Doe</h2>
            <p className="px-2 sm:px-0 mb-13 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut fermentum leo, et eleifend justo. Quisque vel pellentesque turpis. Vivamus orci odio, dictum sed ultrices at, venenatis eu ex. Sed luctus nibh diam, eget viverra nisi suscipit nec. Nunc porta justo id porta auctor. Suspendisse potenti. Nunc enim libero, dictum et volutpat sit amet, porttitor vel sem. Ut malesuada felis eget posuere interdum. Nullam dui velit, dapibus in nulla vel, tempor eleifend ex. In velit arcu, fringilla nec libero ut, sagittis facilisis nisl. Morbi mattis facilisis urna. Mauris ut nisl urna. Donec ornare nec nulla quis viverra. Vivamus molestie rhoncus turpis sit amet consequat. 
            </p>
          </div>
        </div>
    </section>
  )
}