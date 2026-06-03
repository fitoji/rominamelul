"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import Link from "next/link"

type Playlist = {
  title: string
  description: string
  playlistId: string
  videoId: string
}

function YouTubeFacade({ playlist }: { playlist: Playlist }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const thumbnailUrl = `https://i.ytimg.com/vi/${playlist.videoId}/maxresdefault.jpg`

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed?listType=playlist&list=${playlist.playlistId}&rel=0`}
        title={`Videos de ${playlist.title} - Playlist de Romina Melul`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    )
  }

  return (
    <button
      onClick={() => setIsLoaded(true)}
      className="relative w-full h-full group cursor-pointer"
      aria-label={`Reproducir playlist de ${playlist.title}`}
    >
      <Image
        src={thumbnailUrl}
        alt={`Thumbnail de ${playlist.title}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
        </div>
      </div>
    </button>
  )
}

export function Videos() {
  const playlists: Playlist[] = [
    {
      title: "Yoga",
      description: "Prácticas de Hatha Yoga para el equilibrio físico, mental y energético.",
      playlistId: "PL8V1b3Mh65VCygZhuj_k3HTMsZPHJr9U_",
      videoId: "jvzbnPYzDSc",
    },
    {
      title: "Lectura Corporal",
      description: "Explorando la conexión entre el cuerpo y las emociones.",
      playlistId: "PL8V1b3Mh65VCwumdIPY6U2cgvoA-s6Gh0",
      videoId: "lvEc_vDpubs",
    },
  ]

  return (
    <section id="videos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-sans font-medium text-primary">
              Contenido en Video
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            <span className="text-primary">Videos</span> y Prácticas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Explora mis playlists de YouTube con contenido sobre yoga, lectura corporal 
            y prácticas para el bienestar integral.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {playlists.map((playlist) => (
            <div
              key={playlist.playlistId}
              className="bg-background rounded-2xl overflow-hidden shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Video Embed */}
              <div className="aspect-video w-full">
                <YouTubeFacade playlist={playlist} />
              </div>
              
              {/* Playlist Info */}
              <div className="p-6">
                <h3 className="text-2xl font-medium text-foreground mb-2">
                  {playlist.title}
                </h3>
                <p className="text-muted-foreground font-sans">
                  {playlist.description}
                </p>
                  <div className="text-center mt-12">
          <Link
            href={`https://www.youtube.com/playlist?list=${playlist.playlistId}&rel=0`}

            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-sans font-medium transition-colors"
          >
            <span>Playlist {playlist.title}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
      
      </div>
    </section>
  )
}
