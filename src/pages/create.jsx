import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [avatar, setAvatar] = useState()
    const [country, setCountry] = useState("")
    const onImageChange = (e) => {
        const reader = new FileReader;
        reader.addEventListener("load", () => {
            setAvatar(reader.result);
        })
        reader.readAsDataURL(e.target.files[0])
    };
    // const persons = (() => {
    //     const items = localStorage.getItem('person');
    //     return items === null
    //         ? []
    //         : JSON.parse(items);
    // })();
    const saveData = async () => {
        if (name !== "" && email !== "" && dob !== "" && country != "" && avatar !== "") {
            axios(
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    url: "https://crudcrud.com/api/53bf2e24d5d74491b9884b18d024418b/person",
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
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <h1>Create a New Person</h1>
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
                        <button onClick={() => { saveData() }}>Create</button>
                    </div>
                </div>
            </div>
        </>
    )
}