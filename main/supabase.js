import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://mpggwnqpzpjfkpzvccep.supabase.co';
const supabaseKey = 'sb_publishable_80JFPMBosvIUQy0X-NRyYA_RonFuAzh';

export const supabase = createClient(supabaseUrl, supabaseKey);