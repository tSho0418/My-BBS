export default function LoadingDots() {
  return (
    <div className="flex space-x-3">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className="h-3 w-3 animate-bounce rounded-full bg-black"
          style={{
            animationDelay: `${dot * 0.15}s`,
            animationDuration: "0.8s",
          }}
        ></div>
      ))}
    </div>
  )
}
  
  