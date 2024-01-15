/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: "comedyshowbucket.s3.amazonaws.com"
      }
    ]
  }
}

module.exports = nextConfig

// Lorem ipsum dolor sit amet consectetur adipisicing elit. 
// Culpa earum molestias libero sed, aspernatur cumque, 
// laborum voluptas nisi natus fugit maxime officiis sit 
// ab ea recusandae tenetur debitis sequi ratione.