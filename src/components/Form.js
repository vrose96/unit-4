import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../store/authContext';

const Form = () => {
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(true); // Default status

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                '/posts',
                { title, content, status },
                {
                    headers: {
                        Authorization: `Bearer ${state.token}` // Assuming your backend expects a Bearer token
                    }
                }
            );
            navigate('/profile'); // Navigate to profile on successful post
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <main>
            <h1>Form</h1>
            <form className='form add-post-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='form-input add-post-input'
                />
                <textarea
                    placeholder='Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='form-input add-post-input textarea'
                />
                <div className='flex-row status-container'>
                    <div className='radio-btn'>
                        <label htmlFor='private-status'>
                            Private:
                            <input
                                type='radio'
                                name='status'
                                id='private-status'
                                value={true}
                                checked={status === true}
                                onChange={() => setStatus(true)}
                            />
                        </label>
                    </div>
                    <div className='radio-btn'>
                        <label htmlFor='public-status'>
                            Public:
                            <input
                                type='radio'
                                name='status'
                                id='public-status'
                                value={false}
                                checked={status === false}
                                onChange={() => setStatus(false)}
                            />
                        </label>
                    </div>
                </div>
                <button type='submit' className='form-btn'>
                    Submit
                </button>
            </form>
        </main>
    );
};

export default Form;
