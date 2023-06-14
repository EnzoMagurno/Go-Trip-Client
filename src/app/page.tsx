import Link from "next/link"

const page = () => {
  return (
    <>
      <h1>Go-Trip</h1>
      <Link href={'/testing'}>Testing Redux</Link>
    </>
  )
}

export default page