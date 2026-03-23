export async function POST(req: Request) {
  const { purpose, tone, context } = await req.json();

  const output = `
Subject: ${purpose}

Dear Sir/Madam,

I hope you are doing well.

${context}

I would like to express my interest regarding the above and would appreciate your time and consideration.

Looking forward to your response.

Sincerely,  
[Your Name]
`;

  return Response.json({ output });
}