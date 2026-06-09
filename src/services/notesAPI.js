import axios from 'axios'

const API_URL = "https://oevaiwgjcoujmntkobzx.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldmFpd2dqY291am1udGtvYnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDY3MzEsImV4cCI6MjA5NjUyMjczMX0.hh_kvYYqtuwmZf9biMxYEAmmz5OBWyEI4YCmvch8YH8"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    // TAMBAHAN: Fungsi deleteNote menggunakan query string Supabase (?id=eq.${id})
    async deleteNote(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        return response.data
    }
}