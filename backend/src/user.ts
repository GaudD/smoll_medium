import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { Hono } from 'hono'
import { signinInput, signupInput } from '@gaud001/medium-common';

export const userRouter = new Hono<{
	Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables : {
		userId: string
	}
}>();


userRouter.post('/signup', async (c) => {


    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body)
  if (!success) {
        console.log(success)
        c.status(411)

        return c.json({error:"Invalid Inputs"})
    }

    try {
      const user = await prisma.user.create({
        data: {
          email: body.username,
          password: body.password,
          name: body.name
        }
      })
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt })
    } catch (e) {
      c.status(403)
      return c.json({ error:"Email already in use"})
    }
  })
  
userRouter.post('/signin', async (c) => {
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  const { success } = signinInput.safeParse(body)
  console.log(success)
    if (!success) {
        c.status(411)
        console.log(success)

        return c.json({error:"Invalid Inputs"})
    }
  
    const response = await prisma.user.findUnique({
        where: {
          email: body.username,
          password: body.password
        }
    })
    
    if (!response) {
      c.status(403);
      return c.json({error:"User not found / Password incorrect"})
    }
  
    const jwt = await sign({ id: response.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  
})
  
