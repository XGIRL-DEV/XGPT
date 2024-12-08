'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, } from "@/components/Card"
import { CardContent } from "@/components/CardContent"
import { CardFoter } from "@/components/CardFoter"
import { Badge } from "@/components/Badge"
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa"
import { VscVerifiedFilled } from "react-icons/vsc"
import { RiMessage2Fill } from "react-icons/ri"
import { MdFiberManualRecord } from "react-icons/md"

interface Profile {
  nome: string
  cidade: string
  photos: string[]
  stories: string[]
  tag: string
  tagtimestamp: string
  certificado: boolean
  live: boolean | string
}

interface MainCardProps {
  profiles: Profile[]
  currentPage: number
  itemsPerPage: number
  onProfileClick: () => void
  customClass?: string
}

const MainCard: React.FC<MainCardProps> = ({
  profiles,
  currentPage,
  itemsPerPage,
  onProfileClick,
  customClass,
}) => {
  const [timeElapsedList, setTimeElapsedList] = useState<string[]>([])

  const formatTimeElapsed = (minutesElapsed: number): string => {
    const hoursElapsed = minutesElapsed / 60

    if (hoursElapsed > 48) {
      return "Há mais de 48 horas"
    } else if (minutesElapsed < 60) {
      return `Há ${minutesElapsed} minuto${minutesElapsed !== 1 ? 's' : ''}`
    } else {
      const hours = Math.floor(hoursElapsed)
      const minutes = minutesElapsed % 60
      return `Há ${hours} hora${hours !== 1 ? 's' : ''}${
        minutes > 0 ? ` ${minutes} minuto${minutes !== 1 ? 's' : ''}` : ''
      }`
    }
  }

  const calculateTimeElapsed = (tagTimestamp: string): string => {
    const timestampDate = new Date(tagTimestamp)

    if (isNaN(timestampDate.getTime())) {
      return "Tempo indeterminado"
    }

    const currentTime = Date.now()
    const elapsedTime = currentTime - timestampDate.getTime()
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60))

    return formatTimeElapsed(minutesElapsed)
  }

  useEffect(() => {
    const timeElapsed = profiles.map((profile) =>
      calculateTimeElapsed(profile.tagtimestamp)
    )
    setTimeElapsedList(timeElapsed)

    const interval = setInterval(() => {
      const updatedTimeElapsed = profiles.map((profile) =>
        calculateTimeElapsed(profile.tagtimestamp)
      )
      setTimeElapsedList(updatedTimeElapsed)
    }, 60000)

    return () => clearInterval(interval)
  }, [profiles])

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProfiles = profiles.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 mt-4 pb-16 ${customClass}`}
    >
      {paginatedProfiles.map((profile, index) => (
        <Link
          key={index}
          href={`/escort/${profile.nome}`}
          onClick={onProfileClick}
        >
          <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-2xl duration-300 bg-gray-800 border-gray-700">
            <div className="relative aspect-square">
              <Image
                src={profile.photos[0] || "/logo.webp"}
                alt={profile.nome}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {profile.live && (
                  <Badge
                    variant="destructive"
                    className="animate-pulse flex items-center gap-1"
                  >
                    <MdFiberManualRecord className="h-2 w-2" />
                    <span className="text-xs">Live Cam</span>
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-pink-800 text-white flex items-center gap-1"
                  >
                    <FaVideo className="h-3 w-3" />
                    <span className="text-xs">Stories</span>
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg md:text-xl flex items-center gap-1">
                  {profile.nome}
                  {profile.certificado && (
                    <VscVerifiedFilled className="text-green-400" />
                  )}
                </h3>
                <p className="text-sm text-gray-300 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-pink-800" />
                  {profile.cidade}
                </p>
              </div>
            </div>
            <CardContent className="relative bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
    {profile.tag ? `"${profile.tag}"` : "Sem texto postado."}
  </p>
  <span className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
    <MdFiberManualRecord className="text-xs text-green-500" />
    Postado agora
  </span>
</CardContent>
<CardFoter className="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2">
  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
    <RiMessage2Fill className="text-lg text-gray-400 dark:text-gray-500" />
    {timeElapsedList[index]}
  </div>
  <button className="text-sm text-blue-500 hover:underline">
    Ver mais
  </button>
</CardFoter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default MainCard

