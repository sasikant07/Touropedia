import React, {useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBValidationItem,
    MDBBtn,
    MDBSpinner
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import './AddEditTour.css';

const initialState = {
    title: "",
    description: "",
    tags: []
}

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);

    const {title, description, tags} = tourData;

    const onInputChange = () => {

    }

    const handleSubmit = () => {

    }

    const handleAddTag = () => {

    }

    const handleDeleteTag = () => {

    }

    const handleClear = () => {

    }

  return (
    <div className="addtour-container">
        <MDBCard alignment='center'>
            <h5 className='form-heading'>Add Tour</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                    <div className='col-md-12'>
                        <MDBValidationItem feedback="Please provide title" invalid>
                            <input
                                placeholder='Enter Title'
                                type='text'
                                value={title}
                                name="title"
                                noChange={onInputChange}
                                className='title-input'
                                required
                                />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-12'>
                        <MDBValidationItem feedback="Please provide description" invalid>
                            <textarea
                                placeholder='Enter Description'
                                type='text'
                                value={description}
                                name="title"
                                noChange={onInputChange}
                                className='description-textarea'
                                required
                                />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-12'>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            placeholder='Enter Tag'
                            fullWidth
                            value={tags}
                            onAdd={(tag) => handleAddTag(tag)}
                            onDelete={(tag) => handleDeleteTag(tag)}
                        />
                    </div>
                    <div className='d-flex justify-content-start'>
                        <FileBase 
                            type="file" 
                            multiple={false} 
                            onDone={({base64}) => setTourData({...tourData, imageFile: base64})}
                        />
                    </div>
                    <div className='col-12'>
                        <MDBBtn className='submit-btn'>Submit</MDBBtn>
                        <MDBBtn className='mt-2 clear-btn' color='danger' onClick={handleClear}>clear</MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default AddEditTour;