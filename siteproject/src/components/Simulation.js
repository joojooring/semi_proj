import "../styles/simulation.css"

export default function Simulation() {
  return (
    <>
      <div className="simul">
        <div className="content">
          <h2>Before</h2>
          <img src="./before1.jpg" width="350px" height="200px"></img>
        </div>
        <hr />
        <div className="content">
          <h2>After</h2>
          <img src="./after1.jpg" width="350px" height="200px"></img>
        </div>
      </div>

      <div className="simul">
        <div className="content">
          <h2>Before</h2>
          <img src="./before2.jpg" width="350px" height="200px"></img>
        </div>
        <hr />
        <div className="content">
          <h2>After</h2>
          <img src="./after2.jpg" width="350px" height="200px"></img>
        </div>
      </div>

    </>
  );
}
