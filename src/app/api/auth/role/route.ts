export async function GET(request: Request) {
    return new Response('GET All Roles')
}

export async function POST(request: Request) {
    return new Response('Create New Role')
}

export async function PUT(request: Request) {
    return new Response('Update Role')
}

export async function DELETE(request: Request) {
    return new Response('Delete')
}