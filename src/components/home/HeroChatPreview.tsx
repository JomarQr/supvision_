type HeroChatPreviewProps = {
  chatStep: number
  className?: string
  variant?: 'mobile' | 'desktop'
}

export default function HeroChatPreview({ chatStep, className = '', variant = 'mobile' }: HeroChatPreviewProps) {
  const isDesktop = variant === 'desktop'
  const messagesHeight = isDesktop ? 380 : 196
  const avatarSize = isDesktop ? 'h-9 w-9' : 'h-7 w-7'
  const reactionAvatar = isDesktop ? 'h-6 w-6' : 'h-5 w-5'
  const bubbleText = isDesktop ? 'text-[15px] leading-snug' : 'text-sm'
  const inputMinH = isDesktop ? 44 : 38
  const sendBtn = isDesktop ? 'h-9 w-9' : 'h-8 w-8'
  const gap = isDesktop ? 'gap-2.5' : 'gap-2'
  const bubblePad = isDesktop ? 'px-3.5 py-2.5' : 'px-3 py-2'

  return (
    <div
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.20)',
      }}
    >
      <div
        className="space-y-3 overflow-hidden px-4 pb-2 pt-4"
        style={{ height: messagesHeight, fontFamily: "'Inter', sans-serif" }}
      >
        {isDesktop ? (
          <>
            {chatStep >= 1 && (
              <div className={`flex items-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <img loading="lazy" src="/avatar.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
                <div className={`rounded-2xl rounded-bl-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '82%' }}>
                  Hi, I sent a wire transfer this morning
                </div>
              </div>
            )}
            {chatStep >= 2 && (
              <div className={`flex items-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <img loading="lazy" src="/avatar.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
                <div className="relative">
                  <div className={`rounded-2xl rounded-bl-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '82%' }}>
                    Can you check transaction #TXN-8821?
                  </div>
                  {chatStep >= 3 && (
                    <div
                      className="absolute -bottom-4 left-1 flex items-center overflow-hidden rounded-full border border-white/20"
                      style={{ background: 'rgba(33,73,149,0.75)', animation: 'feature-text-in 0.25s ease both' }}
                    >
                      <span className="py-0.5 pl-1.5 pr-1 text-xs leading-none">👍</span>
                      <img loading="lazy" src="/component-187.webp" alt="" className={`${reactionAvatar} rounded-full object-cover`} />
                    </div>
                  )}
                </div>
              </div>
            )}
            {chatStep >= 4 && (
              <div className={`flex items-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <img loading="lazy" src="/avatar.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
                <div className={`rounded-2xl rounded-bl-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '82%' }}>
                  It&apos;s still showing as pending on my end
                </div>
              </div>
            )}
            {chatStep >= 6 && (
              <div className={`mt-1 flex items-end justify-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <div className={`rounded-2xl rounded-br-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: '#214995', maxWidth: '82%' }}>
                  Looking up transaction #TXN-8821…
                </div>
                <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
              </div>
            )}
            {chatStep >= 8 && (
              <div className={`flex items-end justify-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <div className={`rounded-2xl rounded-br-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: '#214995', maxWidth: '82%' }}>
                  Transaction is being processed — ETA ~2 min
                </div>
                <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
              </div>
            )}
            {chatStep >= 10 && (
              <div className={`flex items-end justify-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <div className={`rounded-2xl rounded-br-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: '#214995', maxWidth: '82%' }}>
                  Transaction completed successfully <span style={{ color: '#4ade80' }}>✓</span>
                </div>
                <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
              </div>
            )}
          </>
        ) : (
          <>
            {chatStep >= 1 && (
              <div className={`flex items-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <img loading="lazy" src="/avatar.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
                <div className="relative">
                  <div className={`rounded-2xl rounded-bl-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: 'rgba(255,255,255,0.18)', maxWidth: '78%' }}>
                    Check transaction #TXN-8821
                  </div>
                  {chatStep >= 2 && (
                    <div
                      className="absolute -bottom-3.5 left-1 flex items-center overflow-hidden rounded-full border border-white/20"
                      style={{ background: 'rgba(33,73,149,0.75)', animation: 'feature-text-in 0.25s ease both' }}
                    >
                      <span className="py-0.5 pl-1.5 pr-1 text-xs leading-none">👍</span>
                      <img loading="lazy" src="/component-187.webp" alt="" className={`${reactionAvatar} rounded-full object-cover`} />
                    </div>
                  )}
                </div>
              </div>
            )}
            {chatStep >= 4 && (
              <div className={`mt-4 flex items-end justify-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <div className={`rounded-2xl rounded-br-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: '#214995', maxWidth: '78%' }}>
                  Transaction is being processed
                </div>
                <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
              </div>
            )}
            {chatStep >= 7 && (
              <div className={`flex items-end justify-end ${gap}`} style={{ animation: 'feature-text-in 0.3s ease both' }}>
                <div className={`rounded-2xl rounded-br-sm text-white ${bubbleText} ${bubblePad}`} style={{ background: '#214995', maxWidth: '78%' }}>
                  Transaction completed successfully <span style={{ color: '#4ade80' }}>✓</span>
                </div>
                <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} mb-0.5 flex-shrink-0 rounded-full object-cover`} />
              </div>
            )}
          </>
        )}
      </div>

      <div className={`flex items-center border-t border-white/10 px-3 ${isDesktop ? 'gap-2.5 py-3.5' : 'gap-2 py-3'}`}>
        <img loading="lazy" src="/component-187.webp" alt="" className={`${avatarSize} flex-shrink-0 rounded-full object-cover`} />
        <div
          className={`flex flex-1 items-center overflow-hidden rounded-xl px-3 py-2 ${bubbleText}`}
          style={{ background: 'rgba(255,255,255,0.08)', minHeight: inputMinH, fontFamily: "'Inter', sans-serif" }}
        >
          {isDesktop ? (
            <>
              {chatStep === 5 && (
                <span key="c1" className="inline-block overflow-hidden whitespace-nowrap text-white" style={{ animation: 'chat-type 1.2s steps(36, end) both', width: '0', maxWidth: '100%' }}>
                  Looking up transaction #TXN-8821…
                </span>
              )}
              {chatStep === 7 && (
                <span key="c2" className="inline-block overflow-hidden whitespace-nowrap text-white" style={{ animation: 'chat-type 1.3s steps(42, end) both', width: '0', maxWidth: '100%' }}>
                  Transaction is being processed — ETA ~2 min
                </span>
              )}
              {chatStep === 9 && (
                <span key="c3" className="inline-block overflow-hidden whitespace-nowrap text-white" style={{ animation: 'chat-type 1.1s steps(35, end) both', width: '0', maxWidth: '100%' }}>
                  Transaction completed successfully ✓
                </span>
              )}
            </>
          ) : (
            <>
              {chatStep === 3 && (
                <span key="m1" className="inline-block overflow-hidden whitespace-nowrap text-white" style={{ animation: 'chat-type 1.1s steps(32, end) both', width: '0', maxWidth: '100%' }}>
                  Transaction is being processed
                </span>
              )}
              {chatStep === 6 && (
                <span key="m2" className="inline-block overflow-hidden whitespace-nowrap text-white" style={{ animation: 'chat-type 1.0s steps(35, end) both', width: '0', maxWidth: '100%' }}>
                  Transaction completed successfully ✓
                </span>
              )}
            </>
          )}
        </div>
        <div className={`flex flex-shrink-0 items-center justify-center rounded-full ${sendBtn}`} style={{ backgroundColor: '#214995' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`${isDesktop ? 'h-4 w-4' : 'h-3.5 w-3.5'} text-white`}>
            <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022l11-4.25a.75.75 0 0 0 0-1.398l-11-4.253Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
