
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rattfxpufuehmlmakbam.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdHRmeHB1ZnVlaG1sbWFrYmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MDcwNjMsImV4cCI6MjA1NDE4MzA2M30.TqUxlVuMnU9GrlHiEkwe2HLKSOJgJtKnPml4z-xvUng';
export const supabase = createClient(supabaseUrl, supabaseKey);