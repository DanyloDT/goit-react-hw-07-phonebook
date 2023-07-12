import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const mockApi = axios.create({
  baseURL: 'https://64aeb805c85640541d4d97b7.mockapi.io',
});

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await mockApi.get('/contacts');
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await mockApi.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const loading = getState().contacts.loading;
      if (loading) {
        return false;
      }
    },
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (addContact, { rejectWithValue }) => {
    try {
      const { data } = await mockApi.post(`/contacts/`, addContact);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
