
import express, {
    type Application,
    type Request,
    type Response
} from "express"

import { userRouter } from "./modules/users/user.route";
import { profileRouter } from "./modules/profile/profile.route";

const app: Application = express();
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is rot Route"
    })
})

app.use("/api/v1/users",userRouter)
app.use("/api/v1/profile",profileRouter)


export default app

