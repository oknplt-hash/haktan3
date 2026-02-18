
import { supabase } from './supabase.js';

const DEFAULT_SETTINGS = {
    whatsapp_number: "905000000000",
    iban_list: "HAKTAN SARAYI - TR00 0000 0000 0000 0000 0000 00",
    site_name: "HAKTAN Kuruyemiş Şarküteri Sarayı",
    contact_email: "iletisim@haktan.com",
    address: "Haktan Sarayı, İstanbul"
};

export async function getSettings() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                console.log("Seeding default settings...");
                const { data: newData, error: insertError } = await supabase
                    .from('site_settings')
                    .insert([DEFAULT_SETTINGS])
                    .select()
                    .single();

                if (insertError) {
                    console.error("Error seeding settings:", insertError);
                    return DEFAULT_SETTINGS;
                }
                return newData;
            }
            console.error("Error fetching settings:", error);
            return DEFAULT_SETTINGS;
        }
        return data;
    } catch (e) {
        console.error("Settings load fail:", e);
        return DEFAULT_SETTINGS;
    }
}

export async function updateSettings(updates) {
    const { data: current } = await supabase.from('site_settings').select('id').single();

    if (current) {
        const { error } = await supabase
            .from('site_settings')
            .update(updates)
            .eq('id', current.id);

        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('site_settings')
            .insert([updates]);

        if (error) throw error;
    }
}
