import type { NextRequest } from 'next/server'
import { JobValidation } from '@app/web/jobs/jobs'
import { executeJob } from '@app/web/jobs/jobExecutors'
import { executeJobApiTokenHeader } from '@app/web/app/api/jobs/executeJobApiTokenHeader'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const POST = async (request: NextRequest) => {
  const { body, headers } = request

  if (
    headers.get(executeJobApiTokenHeader) !==
    ServerWebAppConfig.internalApiPrivateKey
  ) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Invalid API token',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 403,
      },
    )
  }

  const jobPayload = await JobValidation.safeParseAsync(body)

  if (!jobPayload.success) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: jobPayload.error.message,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }

  const start = Date.now()
  const result = await executeJob(jobPayload.data)
  const done = Date.now()

  return new Response(
    JSON.stringify({
      status: 'ok',
      duration: (done - start) / 1000,
      result,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}