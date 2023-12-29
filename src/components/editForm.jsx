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
        <div className="w-full">
            {user && (
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="py-2 rounded flex flex-wrap gap-4 px-5">
                        <div className="w-full px-5">
                            <div>
                                <label htmlFor="name" className="block text-black text-sm mb-3">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-black text-sm mb-3">
                                    Gender
                                </label>
                                <Field
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-black text-sm mb-3">
                                    Age
                                </label>
                                <Field
                                    type="number"
                                    id="age"
                                    name="age"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <label htmlFor="english" className="block text-black text-sm mb-3">
                                    English Grade
                                </label>
                                <Field
                                    type="number"
                                    id="english"
                                    name="english"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="english" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <label htmlFor="math" className="block text-black text-sm mb-3">
                                    Math Grade
                                </label>
                                <Field
                                    type="number"
                                    id="math"
                                    name="math"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="math" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div>
                                <label htmlFor="science" className="block text-black text-sm mb-3">
                                    Science Grade
                                </label>
                                <Field
                                    type="number"
                                    id="science"
                                    name="science"
                                    className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="science" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-3 bg text-white py-3 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Update Data
                        </button>
                    </Form>
                </Formik>
            )}
        </div>
    );
};

export default EditForm;
