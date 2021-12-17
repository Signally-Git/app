export default function DetectSocialNetwork(props) {
    const handleReplace = () => {
        switch (props.social) {
            case "snapchat":
                return <svg id="Layer_1" height="24" fill={props.fill} viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m256 0c-141.385 0-256 114.615-256 256s114.615 256 256 256 256-114.615 256-256-114.615-256-256-256zm141.237 340.541c-7.869 4.563-25.949 8.762-31.439 8.762s-5.82 6.024-5.49 10.222-1.683 10.405-13.395 7.666-25.123-4.713-36.014 1.826c-7.9 4.746-25.4 24.1-54.9 24.1s-46.994-19.349-54.9-24.1c-10.891-6.539-24.3-4.563-36.015-1.826s-13.725-3.468-13.394-7.666 0-10.222-5.491-10.222-23.57-4.2-31.439-8.762-6.99-13.143 1.372-13.143 16.745-2.738 37.607-21.905 21.776-38.333 21.776-40.7-7.48-9.371-20.5-11.683a25.22 25.22 0 0 1 -13.906-8.059 9.243 9.243 0 0 1 1.3-13.781 13.256 13.256 0 0 1 14.1-.92c10.069 5.417 22.624 3.958 22.624 3.958a359.927 359.927 0 0 1 -2.343-43.809c.366-21.9 15.737-71.19 79.2-71.19s78.836 49.286 79.2 71.19a359.927 359.927 0 0 1 -2.343 43.809s12.554 1.459 22.623-3.958a13.256 13.256 0 0 1 14.1.92 9.243 9.243 0 0 1 1.3 13.781 25.216 25.216 0 0 1 -13.906 8.059c-13.016 2.312-20.5 9.31-20.5 11.683s.916 21.539 21.777 40.7 29.259 21.907 37.624 21.907 9.241 8.577 1.372 13.141z" /></svg>
            case "twitter":
                return <svg height="24" viewBox="0 0 152 152" fill={props.fill} width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g fill={props.fill} id="_02.twitter" data-name="02.twitter"><path d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm37.85 53a32.09 32.09 0 0 1 -6.51 7.15 2.78 2.78 0 0 0 -1 2.17v.25a45.58 45.58 0 0 1 -2.94 15.86 46.45 46.45 0 0 1 -8.65 14.5 42.73 42.73 0 0 1 -18.75 12.39 46.9 46.9 0 0 1 -14.74 2.29 45 45 0 0 1 -22.6-6.09 1.3 1.3 0 0 1 -.62-1.44 1.25 1.25 0 0 1 1.22-.94h1.9a30.31 30.31 0 0 0 16.94-5.14 16.45 16.45 0 0 1 -13-11.17.86.86 0 0 1 1-1.11 15.08 15.08 0 0 0 2.76.26h.35a16.42 16.42 0 0 1 -9.57-15.11.86.86 0 0 1 1.27-.75 14.44 14.44 0 0 0 3.74 1.45 16.42 16.42 0 0 1 -2.65-19.91.86.86 0 0 1 1.41-.11 43 43 0 0 0 29.51 15.77h.08a.62.62 0 0 0 .6-.67 17.39 17.39 0 0 1 .38-6 15.91 15.91 0 0 1 10.7-11.44 17.59 17.59 0 0 1 5.19-.8 16.36 16.36 0 0 1 10.84 4.09 2.12 2.12 0 0 0 1.41.54 2.15 2.15 0 0 0 .5-.07 30.3 30.3 0 0 0 8-3.3.85.85 0 0 1 1.25 1 16.23 16.23 0 0 1 -4.31 6.87 29.38 29.38 0 0 0 5.24-1.77.86.86 0 0 1 1.05 1.23z" /></g></g></svg>
            case "facebook":
                return <svg height="24" viewBox="0 0 152 152" fill={props.fill} width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_01.facebook" data-name="01.facebook"><path d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm19.26 68.8-1.26 10.59a2 2 0 0 1 -2 1.78h-11v31.4a1.42 1.42 0 0 1 -1.4 1.43h-11.2a1.42 1.42 0 0 1 -1.4-1.44l.06-31.39h-8.33a2 2 0 0 1 -2-2v-10.58a2 2 0 0 1 2-2h8.27v-10.26c0-11.87 7.07-18.33 17.4-18.33h8.47a2 2 0 0 1 2 2v8.91a2 2 0 0 1 -2 2h-5.19c-5.62.09-6.68 2.78-6.68 6.8v8.85h12.32a2 2 0 0 1 1.94 2.24z" /></g></g></svg>
            case "pinterest":
                return <svg height="24" viewBox="0 0 176 176" fill={props.fill} width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_10.pinterest" data-name="10.pinterest"><path id="icon" d="m176 85.79a87.91 87.91 0 1 0 0 2.21c0-.74 0-1.48 0-2.21zm-79.51 26.71c-6.83 0-13.24-3.69-15.44-7.88 0 0-3.67 14.56-4.44 17.37-2.74 9.92-10.78 19.86-11.41 20.67a.84.84 0 0 1 -1.5-.36c-.17-1.26-2.22-13.79.19-24l8.11-34.44a24.24 24.24 0 0 1 -2-10c0-9.36 5.43-16.35 12.19-16.35 5.74 0 8.52 4.31 8.52 9.49 0 5.77-3.68 14.41-5.58 22.42-1.59 6.7 3.36 12.17 10 12.17 12 0 20-15.38 20-33.6 0-13.84-9.32-24.21-26.29-24.21-19.16 0-31.11 14.29-31.11 30.22 0 5.51 1.63 9.39 4.17 12.39 1.17 1.38 1.34 1.94.91 3.52-.3 1.17-1 4-1.29 5.07a2.16 2.16 0 0 1 -3.16 1.58c-8.83-3.56-12.94-13.23-12.94-24.09 0-17.95 15.14-39.47 45.16-39.47 24.12 0 40 17.45 40 36.19 0 24.81-13.78 43.31-34.09 43.31z" /></g></g></svg>
            case "instagram":
                return <svg height="24" viewBox="0 0 152 152" fill={props.fill} width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_05.instagram" data-name="05.instagram"><circle cx="76" cy="76" r="12.01" /><path d="m91.36 45.65h-30.72a15 15 0 0 0 -15 15v30.71a15 15 0 0 0 15 15h30.72a15 15 0 0 0 15-15v-30.72a15 15 0 0 0 -15-14.99zm-15.36 50.01a19.66 19.66 0 1 1 19.65-19.66 19.68 19.68 0 0 1 -19.65 19.66zm19.77-34.46a4.86 4.86 0 1 1 4.85-4.85 4.86 4.86 0 0 1 -4.85 4.85z" /><path d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm38 91.36a22.66 22.66 0 0 1 -22.64 22.64h-30.72a22.67 22.67 0 0 1 -22.64-22.64v-30.72a22.67 22.67 0 0 1 22.64-22.64h30.72a22.67 22.67 0 0 1 22.64 22.64z" /></g></g></svg>
            case "linkedin":
                return <svg height="24" viewBox="0 0 152 152" fill={props.fill} width="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><g id="_10.linkedin" data-name="10.linkedin"><path d="m76 0a76 76 0 1 0 76 76 76 76 0 0 0 -76-76zm-19.34 111.43a2.57 2.57 0 0 1 -2.57 2.57h-10.92a2.56 2.56 0 0 1 -2.57-2.57v-45.79a2.57 2.57 0 0 1 2.57-2.57h10.92a2.57 2.57 0 0 1 2.57 2.57zm-8-52.67a10.38 10.38 0 1 1 10.34-10.39 10.38 10.38 0 0 1 -10.37 10.39zm65.12 52.88a2.36 2.36 0 0 1 -2.36 2.36h-11.75a2.36 2.36 0 0 1 -2.36-2.36v-21.48c0-3.21.93-14-8.38-14-7.22 0-8.69 7.42-9 10.75v24.78a2.36 2.36 0 0 1 -2.34 2.31h-11.34a2.35 2.35 0 0 1 -2.36-2.36v-46.2a2.36 2.36 0 0 1 2.36-2.37h11.34a2.37 2.37 0 0 1 2.41 2.37v4c2.68-4 6.66-7.13 15.13-7.13 18.78 0 18.67 17.54 18.67 27.17z" /></g></g></svg>
            default:
                return <svg id="Layer_1" height="24" fill={props.fill} viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"></svg>
        }
    }
    return (handleReplace())
}