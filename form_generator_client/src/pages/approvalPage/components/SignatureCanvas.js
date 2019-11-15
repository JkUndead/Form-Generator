import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import SignaturePad from 'react-signature-canvas';
import '../sigCanvas.css';

const SignatureCanvas = ({ signForm }) => {
    const [imageURL, setImageURL] = useState(null);

    const sigCanvas = useRef({}); //useRef from react hooks

    const clear = () => sigCanvas.current.clear(); //clear canvas

    const save = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
        signForm();
    }




    return (
        <div className=" mt-3">
            <div className="row justify-content-md-center">
                {
                    imageURL ? (
                        <img
                            src={imageURL}
                            alt="manager signature"
                            style={{
                                display: 'inline',
                                margin: '0 auto',
                                border: '1px solid black',
                                width: '200px',
                                height: '200px'
                            }}
                        />
                    ) : null
                }
            </div>
            <div className="row justify-content-md-center mt-3">
                <Popup
                    modal
                    trigger={<button className="btn btn-outline-info">Sign Here</button>}
                    closeOnDocumentClick={false}
                >
                    {close => (
                        <>
                            <SignaturePad
                                ref={sigCanvas}
                                canvasProps={{
                                    className: "signatureCanvas"
                                }}
                            />
                            <div className="row">
                                <div className="col-sm-3 col-md-4 text-center">
                                    <button className="btn btn-outline-info btn-sm" onClick={clear}>Clear</button>
                                </div>
                                <div className="col-sm-3 col-md-4 text-center">
                                    <button className="btn btn-success btn-sm" onClick={save}>Save</button>
                                </div>
                                <div className="col-sm-3 col-md-4 text-center">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={close}>Close</button>
                                </div>
                            </div>



                        </>
                    )}
                </Popup>
            </div>
        </div >
    )
}

export default SignatureCanvas;