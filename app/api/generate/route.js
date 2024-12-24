import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log(body);

        const client = await clientPromise;
        const db = client.db('bitTree');
        const collection = db.collection('links');

        // duplicate email case
        // const preExist = await collection.findOne({email: body.email});
        // if(preExist) {
        //     return Response.json({ success: false, error: true, message: 'Email already exists'});
        // }

        // Check if handle already exists
        const doc = await collection.findOne({ handle: body.handle });
        if (doc) {
            return Response.json({ success: false, error: true, message: 'Handle not available, try a different one' });
        }

        // Insert new document
        await collection.insertOne(body);

        return Response.json({ success: true, error: false, message: 'Added successfully' });
    } catch (err) {
        console.error("Error in POST route:", err);
        return Response.json({ success: false, error: true, message: 'An error occurred', details: err.message });
    }
}
