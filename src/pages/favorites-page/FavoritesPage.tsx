import { useDispatch, useSelector } from "react-redux";
import s from "./FavoritesPage.module.css";
import { RootState } from "../../services/store/store";
import { deleteCard } from "../../services/slices/gameSlice";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function FavoritesPage() {
  const favorites = useSelector(
    (state: RootState) => state.games.favoriteCards
  );
  const dispatch = useDispatch();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const removeCard = (cardId: number) => {
    setDeletingId(cardId);
    // Задержка перед удалением карточки из store, чтобы анимация успела проиграться
    setTimeout(() => {
      dispatch(deleteCard(cardId));
      setDeletingId(null);
    }, 500); // 500ms соответствует длительности анимации
  };
  return (
    <div className={s.main_wrapper}>
      <div className={s.header_img}></div>
      <main className={s.main_content}>
        {favorites.length === 0 && (
          <p className={s.empty_message}>Список желаемого пуст</p>
        )}
        {favorites.map((item) => (
          <div className={`${s.card_wrapper} ${deletingId === item.id ? s.deleting : ''}`}>
            <div className={s.image_wrapper}>
              <img src={item.image} alt={item.title} />
            </div>

            <div className={s.info}>
              <h1>{item.title}</h1>
              <dl className={s.game_info_table}>
                <dt>Дата выхода</dt>
                <dd>{item.year}</dd>
                <dt>Сайт игры</dt>
                <dd>
                  <a href={item.site} target="_blank">
                    Официальный сайт
                  </a>
                </dd>
                <dt>Рейтинг</dt>
                <dd>{item.rate} из 10</dd>

                <dt>Купить в стим</dt>
                <dd>
                  <Link to={`${item.steam}`} target="_blank">
                    <img className={s.steam_img} src="/steam.png" alt="" />
                  </Link>
                </dd>
                <dt>Цена</dt>

                <dd>
                  {item.price === "Бесплатно"
                    ? item.price
                    : `${item.price} рублей`}
                </dd>
              </dl>
            </div>
            <div onClick={() => removeCard(item.id)}>
              <Trash2 className={s.remove_button} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
