import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Root() {
    return (
        <>
            <div className="container-fluid">
                <nav>
                    <ul className="nav p-3">
                        <li className="nav-item mr-3">
                            <Link className="btn btn-primary" aria-current="page" to={`create`}>Create New Person</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-success" to={`persons`}>List of Persons</Link>
                        </li>
                    </ul>
                </nav>
                <div id="detail" className="px-3 py-5">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
