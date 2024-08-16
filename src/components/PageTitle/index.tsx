import Text from "../Text"

interface IPageTitleProps {
  title: string
  description?: string
}

const PageTitle = ({ title, description }: IPageTitleProps) => {
  return (
    <div className="text-primary-500">
      {title && (
        <Text as="h2" className="text-3xl py-5 border-b-2 border-primary-500 font-semibold mb-4">{title}</Text>
      )}
      {
        description && (
          <Text className="text-base">
            {description}
          </Text>
        )
      }
    </div>
  )
}

export default PageTitle