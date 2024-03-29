import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { Hono } from 'hono'
import { createBlog, updateBlog } from '@gaud001/medium-common';

export const blogRouter = new Hono<{
	Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables : {
		userId: string
	}
}>();


blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization')
    if (!jwt) {
      c.status(401);
          return c.json({ error: "unauthorized please signin to continue" });
    }
  
    const token = jwt.split(' ')[1]
  
    const user = await verify(token, c.env.JWT_SECRET)
  
    if (!user || !user.id) {
      c.status(401);
          return c.json({ error: "unauthorized please signin to continue" });
    }
    
    console.log(user.id);
  
    c.set('userId', user.id)
    
    await next()
  
  })
  
blogRouter.post('/', async (c) => {

    const authId = c.get('userId')

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    const { success } = createBlog.safeParse(body)

    if (!success) {
        c.status(411)

        return c.json({error:"Invalid Inputs"})
    }

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authId
        }
    })

    return c.json({
        id : blog.id
    })
})
  
blogRouter.put('/', async (c) => {
    const ID = c.get('userId');

    const body = await c.req.json()

    const { success } = updateBlog.safeParse(body)

    if (!success) {
        c.status(411)

        return c.json({error:"Invalid Inputs"})
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.post.update({
        where: {
            id: body.id,
            authorId: ID
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.text("Blog Updated")

})
  
blogRouter.get('/user', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const uid = c.get("userId")

    try {
        const u = await prisma.user.findFirst({
        where: {
            id: uid
        },
        select: {
            name: true,
            email: true
        }
        })

        return c.json({
            "data": u,
            "uid": uid
        })
        
    } catch (e) {
        return c.json({
            "Error":"No res idk why tho"
        })
    }
})
  
blogRouter.get('/single/:id', async (c) => {
    const id : string = c.req.param('id')

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id 
            },
            select: {
                id:true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json(blog)
    } catch (e) {
        c.status(411)
        return c.json({
            "message":"Error while fetching the blog"
        })
    }
  })
  
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    if (!blogs) {
        c.status(400)
        return c.json({mgs:"No Blogs found, maybe you can publish some for others to see"})
    }

    return c.json(blogs)

})
  
blogRouter.delete('/delete/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id  = c.req.param('id')

    try {
        const findBlog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })

        console.log("reached");
        

        const deletedBlog = await prisma.post.delete({
            where: {
                id: id // Use ID directly since it's already a string
            }
        });

        console.log("Done?")

        return c.json({ message: "Blog deleted successfully", deletedBlog });
        
    } catch (error) {
        c.status(400)
        return c.json({ message: "Internal server error" });
    }
})