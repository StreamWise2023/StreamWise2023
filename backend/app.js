const {createClient} = require('@supabase/supabase-js');
const supabase = createClient('http://localhost:8000', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE', {
    db: {
        schema: 'public',
    },
})
const express = require("express");
const app = express();
const vidiosRouter = express.Router();
const userActionsRouter = express.Router();
const userRouter = express.Router();
const authMidle = async (req, res, next) => {
    let user = await supabase.auth.getUser(req.header('Authorization').split(' ')[1]);
    if (user.data.user == null) {
        res.json({
            ok: false,
            error: 'unauthorized request',
        });
        return;
    }
    let userId = user.data.user.id;


    req.params.user = user.data.user;
    req.params.userId = userId;
    next();
};

vidiosRouter.get("/getAllVideos", async (_, response) => {
    let videos = await supabase
        .from('Vidios')
        .select('*');

    response.json({
        ok: true,
        data: videos.data,
    });
});
vidiosRouter.get("/getAllRecommendationVideos", authMidle, async (req, response) => {
    let videos = await supabase
        .from('Vidios')
        .select('*');
    let userId = req.params.userId;
    console.log(videos);

    for (const video of videos.data) {
        let like = await supabase.from('UsersLogs')
            .select('*')
            .eq('user_id', userId)
            .eq('vidio_id', video.id)
            .eq('action', 'like');
        if (like.data.length > 0) {
            video.isLiked = true;
        } else {
            video.isLiked = false;
        }

        let dislike = await supabase.from('UsersLogs')
            .select('*')
            .eq('user_id', userId)
            .eq('vidio_id', video.id)
            .eq('action', 'dislike');

        if (dislike.data.length > 0) {
            video.isDisliked = true;
        } else {
            video.isDisliked = false;
        }
    }

    response.json({
        ok: true,
        data: videos.data,
    });
});
vidiosRouter.get("/setAction", authMidle, async (req, response) => {
    let vidioId = req.query.vidioId;
    let action = req.query.action;
    let userId = req.params.userId;

    const isExistActionThisVidio = await supabase
        .from('UsersLogs')
        .select('*')
        .eq('user_id', userId)
        .eq('vidio_id', vidioId)
        .eq('action', action);

    if (isExistActionThisVidio.data.length <= 0) {
        await supabase.from('UsersLogs').insert({
            user_id: userId,
            vidio_id: vidioId,
            action: action,
        }).select();
    } else {
        await supabase
            .from('UsersLogs')
            .delete()
            .eq('user_id', userId)
            .eq('vidio_id', vidioId)
            .eq('action', action);
    }

    response.json({
        ok: true,
    });
});

userActionsRouter.get("/getAllActions", authMidle, async (req, response) => {
    let userId = req.params.userId;
    const userLogsActions = await supabase.from('UsersLogs')
        .select('*')
        .eq()

    response.json({
        ok: true,
    });
});

userRouter.post("/auth", async (req, response) => {
    let user = await supabase.auth.signInWithPassword({
        email: req.query.email,
        password: req.query.password,
    });

    response.json({
        ok: true,
        session: user.data.session,
    });
});
userRouter.post("/logout", async (req, response) => {
    await supabase.auth.signOut({
        scope: 'global',
    });

    response.json({
        ok: true,
    });
});



app.use('/api/v1/vidio/', vidiosRouter);
app.use('/api/v1/action/', userActionsRouter);
app.use('/api/v1/user/', userRouter);

app.listen(3000, () =>
    console.log(
        new Date().toLocaleTimeString() + `: Server is running on port ${3000}...`
    )
);