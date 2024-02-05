import React, { useEffect, useState } from 'react';
import DashBoard from './DashBoard';
import { toast } from 'react-toastify';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { collection, addDoc, getDocs, doc as firestoreDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebseConfig';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import EditForm from '../components/editForm';
import Lottie from 'lottie-react';
import animation from '../assets/animation.json';

const Students = () => {
    const [studentRecords, setStudentRecords] = useState([]);
    const [editID, setEditID] = useState();
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [pageSize] = useState(13); 
    const [current, setCurrent] = useState(1);

    const onChange = (page) => {
        setCurrent(page);
    };

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentData = studentRecords.slice(startIndex, endIndex);

    const fetchStudentRecords = async () => {
        try {
            setLoading(true);
            const recordsSnapshot = await getDocs(collection(db, 'studentRecords'));
            const newStudentRecords = [];
            recordsSnapshot.forEach((doc) => {
                newStudentRecords.push({ id: doc.id, ...doc.data() });
            });

            setTimeout(() => {
                setStudentRecords(newStudentRecords);
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentRecords();
    }, []);

    const handleFileUpload = async (event) => {
        const csvFile = event.target.files[0];
        const csvData = await csvFile.text();
        const records = csvData.split('\n').map((row, index) => {
            if (index === 0) {
                return null; 
            }
            const fields = row.split(',');
            return {
                name: fields[0],
                gender: fields[1],
                age: fields[2],
                english: fields[3],
                math: fields[4],
                science: fields[5],
            };
        });

        const validRecords = records.filter((record) => record !== null);
        for (const record of validRecords) {
            try {
                await addDoc(collection(db, 'studentRecords'), record);
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
        toast.success('CSV data uploaded to Firebase Firestore successfully');
        fetchStudentRecords();
    };
    const changeStatus = (id) => {
        setPopup(true);
        setEditID(id);
    };

    const onDelete = async (id) => {
        try {  
            await deleteDoc(firestoreDoc(db, 'studentRecords', id));
            setStudentRecords((prevRecords) => prevRecords.filter((student) => student.id !== id));
            toast.success('Student deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting Student');
        }
    };

    const onEdit = async (id, updatedData) => {
        try {
            const studentRef = firestoreDoc(db, 'studentRecords', id);
            await updateDoc(studentRef, updatedData);

            toast.success('Student record updated successfully');
            fetchStudentRecords();
            setPopup(false)
        } catch (error) {
            console.error(error);
            toast.error('Error updating Student');
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#student-table' }); 
        doc.save('student.pdf');
    };

    const tableColumns = ["Name", "Gender", "Age", "English Grade", "Math Grade", "Science Grade", "Action"];
    return (
        <DashBoard>
            {loading ? (
                <div className="flex justify-center items-center ">
                    <Lottie
                        animationData={animation}
                        loop
                        autoplay
                        style={{ width: 400, height: 600 }}
                    />
                </div>
            ) : (
                <div className="w-full md:px-10 flex gap-2 flex-wrap">
                    <div className=" w-full">
                        <div className="px-5 text-2xl text-center items-center font-semibold text-[#CECBE3]">Student Data</div>
                        <div className="py-5 overflow-x-auto ">
                            <div className="md:flex justify-between px-5 items-center text-white">
                                <input type="file" id="csv-file" onChange={handleFileUpload} />

                                <button onClick={exportToPDF} className="bg-[#A16EFD] md:my-0 my-2 text-white px-3 py-2 rounded-md">
                                    Export to PDF
                                </button>
                            </div>

                            <div className="overflow-x-auto py-4 px-5">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-gray-300 rounded-lg shadow-md text-sm" id="student-table">
                                    <thead className="ltr:text-left rtl:text-right">
                                        <tr>
                                            {tableColumns.map((column, index) => (
                                                <th key={index} className="whitespace-nowrap bg-[#A16EFD] text-white px-4 py-4 font-medium text-lg">
                                                    {column}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-400">
                                        {currentData.map((studentRecord) => (
                                            <tr key={studentRecord.id} className="odd:bg-gray-50  ">
                                                <td>
                                                    <div className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{studentRecord.name}</div>
                                                </td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{studentRecord.gender}</td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{studentRecord.age}</td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{studentRecord.english}</td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{studentRecord.math}</td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{studentRecord.science}</td>
                                                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex gap-4 items-center'>
                                                    <button
                                                        onClick={() => changeStatus(studentRecord.id)}
                                                        className="text-[#A16EFD] text-xl hover:text-purple-700"
                                                    >
                                                        <BiEditAlt />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(studentRecord.id)}
                                                        className="text-red-500 text-xl hover:text-red-700"
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-3 flex justify-end">
                                <Pagination onChange={onChange} current={current} pageSize={pageSize} total={studentRecords.length} />
                            </div>
                        </div>
                    </div>
                    {popup && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 flex py-3 items-center justify-center bg-opacity-50 bg-gray-500">
                            <div className="md:w-1/2 top-1 py-5 w-full bg-white relative">
                                <div
                                    className="absolute top-3 right-3 hover:scale-105 text-lg text-black hover:text-red-500"
                                    onClick={() => setPopup(false)}
                                >
                                    <AiFillCloseCircle />
                                </div>
                                <h1 className="text-black text-center py-2 font-semibold">Edit Form</h1>
                                <EditForm
                                    ID={editID}
                                    onEdit={onEdit}
                                    studentRecords={studentRecords}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </DashBoard>
    );
};

export default Students;
