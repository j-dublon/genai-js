import { render, screen } from "@testing-library/react";
import { ArticleCard } from ".";

describe("ArticleCard Component", () => {
  const mockProps = {
    imageUrl:
      "https://images.prismic.io/cuckoo-egg/353122c1-ecf2-4be9-bc9e-61ad08978207_Upgrading+to+full+fibre.png?auto=compress,format&rect=0,33,2144,1206&w=1100&h=619",
    imageAlt: "Article image 1",
    title: "First blog post",
    slug: "/blog/1",
    primaryTag: "Test Tag",
  };

  it("renders the component", () => {
    render(<ArticleCard {...mockProps} />);

    const tag = screen.getByText(/test tag/i);
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent("Test Tag");

    const title = screen.getByText(/first blog post/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("First blog post");
  });
});
