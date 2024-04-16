import { Link } from "@/src/utils/navigation";
import { useTranslations } from "next-intl";

export default function PostsSummry({ posts }) {
  const t = useTranslations();
  return (
    <div className="post_summry">
      <div className="summry_title">
        <h4>{t("posts_summry_title")}</h4>
      </div>
      <div className="summry_content">
        {posts?.slice(0, 3)?.map((el) => {
          return (
            <Link key={el.id} href={`/blog/post/${el.slug}`}>
              <div
                className="post"
                key={el.id}
                style={{
                  backgroundImage: `url(${el?.photo})`,
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                }}
              >
                <Link href={`/blog/post/${el.slug}`} className="post_head">
                  {el?.title}
                </Link>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
