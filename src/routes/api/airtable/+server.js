import { json } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';

export async function POST({ request }) {
    const { email, feature } = await request.json();

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [{
                    fields: {
                        email: email,
                        feedback: feature
                    }
                }]
            })
        });
        console.log(AIRTABLE_API_KEY)

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Airtable API error:', errorData);
            throw new Error('Failed to submit to Airtable');
        }

        return json({ success: true });
    } catch (error) {
        console.error('Error submitting to Airtable:', error);
        // @ts-ignore
        return json({ success: false, error: error.message }, { status: 500 });
    }
}