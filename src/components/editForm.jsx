import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebseConfig';

const EditForm = (props) => {
    const { studentRecords, ID, onEdit } = props;
    const user = studentRecords.find((record) => record.id === ID);

    const [initialValues, setInitialValues] = useState({
        name: '',
        gender: '',
        age: 0,
        english: 0,
        math: 0,
        science: 0, // Corrected the field name to 'science'
        accountStatus: '',
    });

    useEffect(() => {
        if (user) {
            setInitialValues({
                name: user.name || '',
                gender: user.gender || '',
                age: user.age || 0,
                english: user.english || 0,
                math: user.math || 0,
                science: user.science || 0,
            });
        }
    }, [user]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        age: Yup.number().required('Required').positive('Must be a positive number'),
        english: Yup.number().required('Required').min(0, 'Must be at least 0'),
        math: Yup.number().required('Required').min(0, 'Must be at least 0'),
        science: Yup.number().required('Required').min(0, 'Must be at least 0'), // Corrected the field name to 'science'
    });

    const handleSubmit = async (values) => {
        try {
            await onEdit(ID, values);

            // Update the data in Firebase Firestore
            const dbCollection = collection(db, 'studentRecords'); // Assuming you have 'db' defined for your Firebase instance
            const userRef = doc(dbCollection, ID);

            await updateDoc(userRef, values);
            toast.success('Data saved in Firebase');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update data');
        }
    };

    return (
        <div className="w-full h-[90vh]">
            {user && (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="rounded flex flex-wrap px-5">
                        <div className="w-full px-5">
                            <div className='py-2'>
                                <label htmlFor="name" className="block font-medium text-black text-sm mb-1">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]  py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="english" className="block text-black text-sm mb-1 font-medium">
                                    Gender
                                </label>
                                <Field
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]  py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="english" className="block text-black text-sm mb-1 font-medium">
                                    Age
                                </label>
                                <Field
                                    type="number"
                                    id="age"
                                    name="age"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]   py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="english" className="block text-black text-sm mb-1 font-medium">
                                    English Grade
                                </label>
                                <Field
                                    type="number"
                                    id="english"
                                    name="english"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]   py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="english" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="math" className="block text-black text-sm mb-1 font-medium">
                                    Math Grade
                                </label>
                                <Field
                                    type="number"
                                    id="math"
                                    name="math"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]   py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="math" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="science" className="block font-medium text-black text-sm mb-1">
                                    Science Grade
                                </label>
                                <Field
                                    type="number"
                                    id="science"
                                    name="science"
                                    className="w-full px-3 border text-black bg-[#d3d1ea]  py-2 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="science" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                        </div>
                        <div className="w-full px-5 py-2">
                            <button
                                type="submit"
                                className="w-full px-7 bg-[#13326E] text-white  py-2 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                Update Data
                            </button>
                        </div>
                    </Form>
                </Formik>
            )}
        </div>
    );
};

export default EditForm;
