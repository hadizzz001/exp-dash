

export async function fetchTemp() { 
    const response = await fetch('/api/posts', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}



export async function fetchTemp1() { 
    const response = await fetch('/api/order', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}



export async function fetchTemp2() { 
    const response = await fetch('/api/postss', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}


export async function fetchTemp3(id:any) { 
    const response = await fetch(`/api/order/${id}` , { next: { revalidate: 0 } }); 
    const result = await response.json();    
    return result.posts;
}



export async function fetchTemp4() { 
    const response = await fetch('/api/banner', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}



export async function fetchTemp5() { 
    const response = await fetch('/api/under', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}


export async function fetchTemp6() { 
    const response = await fetch('/api/title', { next: { revalidate: 0 } });
    const result = await response.json();  
    return result.posts; 
}
