import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

export default function Persons() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [avatar, setAvatar] = useState()
    const [country, setCountry] = useState("")
    const [getId,setId] = useState("");
    const onImageChange = (e) => {
        const reader = new FileReader;
        reader.addEventListener("load", () => {
            setAvatar(reader.result);
        })
        reader.readAsDataURL(e.target.files[0])
    };
    const [personData, setPersonData] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const updateData = async () => {
        if (name !== "" && email !== "" && dob !== "" && country != "" && avatar !== "") {
            await axios(
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "PUT",
                    url: `https://crudcrud.com/api/53bf2e24d5d74491b9884b18d024418b/person/${getId}`,
                    data: {
                        "name": name,
                        "email": email,
                        "dob": dob,
                        "avatar": avatar,
                        "country": country
                    }


                })
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    useEffect(() => {
        // const request = axios.CancelToken.source()
        // const callApi = async() => {
        //     try {
        //         const response = await axios.get({
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         cancelToken: request.token,
        //         method: "GET",
        //         url: "https://crudcrud.com/api/53bf2e24d5d74491b9884b18d024418b/person"
        //     });
        //         console.log(response);
        //       } catch (error) {
        //         console.error(error);
        //       }
        // }
        
        axios(
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                // cancelToken: request.token,
                method: "GET",
                url: "https://crudcrud.com/api/53bf2e24d5d74491b9884b18d024418b/person"
            })
            .then(res => {
                const person = res.data
                setPersonData(person)
            })
            .catch((error) => {
                console.log(error);
            })
            // return () => request.cancel()
    }, [])
    // personData !== undefined?console.log("get",personData):console.log("hello")

    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {
                    personData !== undefined ?
                        <>
                            {
                                personData.map((data, id) => {
                                    return (
                                        <div className="col">
                                            <div className="card" id={data.id}>
                                                <img src={data.avatar} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title" onClick={() => { setShow(true);setId(data.id) }}>{data.name}</h5>
                                                    <p className="card-text">{data.email}</p>
                                                    <p className="card-text">{data.dob}</p>
                                                    <p className="card-text">{data.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </> :
                        <></>

                }
                <Modal id="update" show={show} onHide={handleClose}>
                    <Modal.Body>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="cancel_apppointmentbx">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">D.O.B</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="07/06/1999"
                                    onChange={(e) => {
                                        setDob(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    onChange={onImageChange}
                                // id="myFileInput"
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="India"
                                    onChange={(e) => {
                                        setCountry(e.target.value)
                                    }}
                                />
                            </div>
                            <button onClick={() => { updateData() }}>Create</button>
                        </div >
                    </Modal.Body >
                </Modal >
            </div>


        </>
    )
}