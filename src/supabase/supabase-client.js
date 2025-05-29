import { createClient } from "@supabase/supabase-js"

const projectUrl = "https://ntukxeqaixxmsrdljvuv.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dWt4ZXFhaXh4bXNyZGxqdnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNjExMTMsImV4cCI6MjA2MzkzNzExM30.EDzKE0A966HKqv3i_fAMmj61FH9Ys9xAnnZS24pvA0w"

export const supabase = createClient(projectUrl, apiKey)