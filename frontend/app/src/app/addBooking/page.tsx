'use client'
import React, { useState } from 'react';

const BookingForm = () => {
  const [service, setService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      
      const res = await fetch('http://host.docker.internal:5000/api/bookings', {
        cache: 'no-store', 
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          doctor_name: doctorName,
          start_time: startTime,
          end_time: endTime,        
          date,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit booking');
      }
      setMessage('Booking successfully submitted');
      window.location.href = '/';
    } catch (error) {
      console.error('Error submitting booking:', error);
      setMessage('Failed');
    }
  };
  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <input type="text" value={service} onChange={(e) => setService(e.target.value)} required />
        </label>
        <br />
        <label>
          Doctor Name:
          <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
        </label>
        <br />
        <label>
          Start Time:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <br />
        <label>
          End Time:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Submit Booking</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;

