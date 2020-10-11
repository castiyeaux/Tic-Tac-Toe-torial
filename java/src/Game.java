import java.awt.*;
import java.util.ArrayList;
import java.util.Scanner;

public class Game {
    private Board b;
    private String playerSymbol;

    private int[][] winArray= {
            {0,1,2},
            {3,4,5},
            {6,7,8},
            {0,3,6},
            {1,4,7},
            {2,5,8},
            {0,4,8},
            {2,4,6}
    };

    public Game() {
        b = new Board();
        playerSymbol = "X";
        while(!checkWin()){
            playerMove(playerSymbol);

        }
    }

    private boolean checkWin(){
        ArrayList<Square> t = b.getSquares();
        for(int[] a:winArray){
            if(t.get(a[0]).getSymbol().equalsIgnoreCase(t.get(a[1]).getSymbol()) &&
            t.get(a[0]).getSymbol().equalsIgnoreCase(t.get(a[2]).getSymbol()) &&
            !t.get(a[0]).getSymbol().equalsIgnoreCase("")){
                b.getSquares().get(a[0]).setBgColor(Color.YELLOW);
                b.getSquares().get(a[1]).setBgColor(Color.YELLOW);
                b.getSquares().get(a[2]).setBgColor(Color.YELLOW);
                return true;
            }
        }
        return false;
    }

    private  void playerMove(String s){
        //Do button on click to square if no symbol
        //TODO
        //Then change player whose turn it is
        playerSymbol = playerSymbol.equals("X") ? "O" : "X";

    }
}
