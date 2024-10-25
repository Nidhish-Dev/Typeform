import Navbar from "@/components/Navbar";

export default function Home() {
  return (

  <>
  <Navbar />
    {/* <div >
                <h1>Typeform Clone</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                    <a href="/dashboard">Dashboard</a>
                </nav>
          
    </div> */}

    <div className="flex mt-32">
      <img className="homeimg" src="/home.png" alt="" />

      <div className="flex flex-col justify-around" >
        <p className="text-7xl mx-7">Get to know your customers with forms worth filling out</p>
        <p className="text-2xl mb-5 mx-7">Collect all the data you need to understand customers with forms designed to be refreshingly different.</p>
      </div>
    </div>
    </>
  );
}
