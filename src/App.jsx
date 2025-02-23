// import { useEffect, useState } from "react"
import ProjectForm from "./components/ProjectForm"
import ProjectList from "./components/ProjectList"

const App = () => {


  return (
    <div className="max-w-[40%] mx-auto">
      <ProjectForm />
      <ProjectList />
    </div>
  )
}
export default App